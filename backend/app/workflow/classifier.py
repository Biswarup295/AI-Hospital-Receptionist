GENERAL_KEYWORDS = {
    "fever",
    "cold",
    "cough",
    "headache",
    "weakness",
    "body pain",
    "sore throat",
    "flu",
    "nausea",
    "stomach ache",
    "dizziness",
}

EMERGENCY_KEYWORDS = {
    "chest pain",
    "bleeding",
    "breathing difficulty",
    "shortness of breath",
    "breathless",
    "unconscious",
    "accident",
    "trauma",
    "severe injury",
    "fracture",
    "burn",
    "stroke",
    "seizure",
}

MENTAL_HEALTH_KEYWORDS = {
    "anxiety",
    "depression",
    "stress",
    "panic attack",
    "panic",
    "emotional distress",
    "insomnia",
    "sadness",
    "overthinking",
    "mental health",
}


def classify_issue(text: str | None) -> tuple[str | None, bool]:
    if not text:
        return None, False

    lowered = text.lower()

    if any(keyword in lowered for keyword in EMERGENCY_KEYWORDS):
        return "Emergency Ward", True

    if any(keyword in lowered for keyword in MENTAL_HEALTH_KEYWORDS):
        return "Mental Health Ward", False

    if any(keyword in lowered for keyword in GENERAL_KEYWORDS):
        return "General Ward", False

    return None, False

