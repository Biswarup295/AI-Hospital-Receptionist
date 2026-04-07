from langgraph.graph import END, START, StateGraph

from app.workflow.classifier import classify_issue
from app.workflow.extractors import (
    extract_patient_age,
    extract_patient_name,
    extract_patient_query,
)
from app.workflow.state import IntakeGraphState


def _determine_missing_fields(state: IntakeGraphState) -> list[str]:
    missing_fields: list[str] = []

    if not state.get("patient_name"):
        missing_fields.append("patient_name")
    if state.get("patient_age") is None:
        missing_fields.append("patient_age")
    if not state.get("patient_query"):
        missing_fields.append("patient_query")

    return missing_fields


def _current_step(state: IntakeGraphState, missing_fields: list[str]) -> str:
    if not missing_fields and state.get("ward") != "Unassigned":
        return "ready_for_submission"
    if "patient_name" in missing_fields:
        return "collecting_name"
    if "patient_age" in missing_fields:
        return "collecting_age"
    if "patient_query" in missing_fields:
        return "collecting_query"
    return "reviewing"


def _build_clarification_reply(state: IntakeGraphState, missing_fields: list[str]) -> str:
    name = state.get("patient_name")
    ward = state.get("ward", "Unassigned")
    is_urgent = state.get("is_urgent", False)

    if "patient_name" in missing_fields:
        prefix = "I have noted the reported issue." if state.get("patient_query") else "I am ready to help with the intake."
        if is_urgent:
            prefix = "Your symptoms may need urgent attention."
        return f"{prefix} Please share the patient's name."

    if "patient_age" in missing_fields:
        if name:
            return f"Thank you, {name}. What is the patient's age?"
        return "Thank you. What is the patient's age?"

    if "patient_query" in missing_fields:
        if name:
            return f"Thank you, {name}. Please describe the main symptom or issue in a little more detail."
        return "Please describe the main symptom or issue in a little more detail."

    if ward == "Unassigned":
        return "Please describe the issue a bit more clearly so I can route the patient to the correct ward."

    return "I have everything I need. Please review the summary and submit the intake."


def extract_node(state: IntakeGraphState) -> IntakeGraphState:
    message = state.get("user_message", "")
    extracted_name = extract_patient_name(message)
    extracted_age = extract_patient_age(message)
    extracted_query = extract_patient_query(message)

    return {
        "patient_name": extracted_name or state.get("patient_name"),
        "patient_age": extracted_age if extracted_age is not None else state.get("patient_age"),
        "patient_query": extracted_query or state.get("patient_query"),
    }


def ward_router(state: IntakeGraphState) -> str:
    classification, _ = classify_issue(state.get("patient_query") or state.get("user_message"))

    if classification == "Emergency Ward":
        return "emergency_ward"
    if classification == "Mental Health Ward":
        return "mental_health_ward"
    if classification == "General Ward":
        return "general_ward"

    if state.get("ward") and state.get("ward") != "Unassigned":
        stored = state["ward"]
        if stored == "Emergency Ward":
            return "emergency_ward"
        if stored == "Mental Health Ward":
            return "mental_health_ward"
        if stored == "General Ward":
            return "general_ward"

    return "clarification"


def general_ward_node(_: IntakeGraphState) -> IntakeGraphState:
    return {"ward": "General Ward", "is_urgent": False}


def emergency_ward_node(_: IntakeGraphState) -> IntakeGraphState:
    return {"ward": "Emergency Ward", "is_urgent": True}


def mental_health_ward_node(_: IntakeGraphState) -> IntakeGraphState:
    return {"ward": "Mental Health Ward", "is_urgent": False}


def clarification_node(state: IntakeGraphState) -> IntakeGraphState:
    missing_fields = _determine_missing_fields(state)
    current_step = _current_step(state, missing_fields)
    reply = _build_clarification_reply(state, missing_fields)

    return {
        "missing_fields": missing_fields,
        "current_step": current_step,
        "reply": reply,
    }


def validation_node(state: IntakeGraphState) -> IntakeGraphState:
    missing_fields = _determine_missing_fields(state)
    ward = state.get("ward", "Unassigned")
    is_complete = not missing_fields and ward != "Unassigned"

    return {
        "missing_fields": missing_fields,
        "current_step": _current_step(state, missing_fields),
        "is_complete": is_complete,
    }


def validation_router(state: IntakeGraphState) -> str:
    return "completion" if state.get("is_complete") else "end"


def completion_node(state: IntakeGraphState) -> IntakeGraphState:
    name = state.get("patient_name", "the patient")
    age = state.get("patient_age")
    patient_query = state.get("patient_query", "the reported issue")
    ward = state.get("ward", "Unassigned")

    reply = (
        f"Thank you. I have completed the intake for {name}, age {age}. "
        f"The reported issue is '{patient_query}', and the patient has been routed to {ward}. "
        "Please review the summary and submit the intake."
    )

    return {
        "current_step": "ready_for_submission",
        "reply": reply,
    }


def build_intake_graph():
    builder = StateGraph(IntakeGraphState)
    builder.add_node("extract", extract_node)
    builder.add_node("general_ward", general_ward_node)
    builder.add_node("emergency_ward", emergency_ward_node)
    builder.add_node("mental_health_ward", mental_health_ward_node)
    builder.add_node("clarification", clarification_node)
    builder.add_node("validation", validation_node)
    builder.add_node("completion", completion_node)

    builder.add_edge(START, "extract")
    builder.add_conditional_edges(
        "extract",
        ward_router,
        {
            "general_ward": "general_ward",
            "emergency_ward": "emergency_ward",
            "mental_health_ward": "mental_health_ward",
            "clarification": "clarification",
        },
    )
    builder.add_edge("general_ward", "clarification")
    builder.add_edge("emergency_ward", "clarification")
    builder.add_edge("mental_health_ward", "clarification")
    builder.add_edge("clarification", "validation")
    builder.add_conditional_edges(
        "validation",
        validation_router,
        {"completion": "completion", "end": END},
    )
    builder.add_edge("completion", END)

    return builder.compile()
