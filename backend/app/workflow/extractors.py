import re

from app.workflow.classifier import (
    EMERGENCY_KEYWORDS,
    GENERAL_KEYWORDS,
    MENTAL_HEALTH_KEYWORDS,
)

NAME_STOPWORDS = {
    "am",
    "feeling",
    "having",
    "suffering",
    "pain",
    "anxious",
    "stressed",
    "depressed",
}

NAME_PATTERNS = [
    r"\bmy name is (?P<value>[A-Za-z][A-Za-z\s'-]{1,40})",
    r"\bname[:\s]+(?P<value>[A-Za-z][A-Za-z\s'-]{1,40})",
    r"\bthis is (?P<value>[A-Za-z][A-Za-z\s'-]{1,40})",
    r"\bi am (?P<value>[A-Za-z][A-Za-z\s'-]{1,40})",
    r"\bi'm (?P<value>[A-Za-z][A-Za-z\s'-]{1,40})",
]

AGE_PATTERNS = [
    r"\bi am (?P<value>\d{1,3})\b",
    r"\bi'm (?P<value>\d{1,3})\b",
    r"\bmy age is (?P<value>\d{1,3})\b",
    r"\bage[:\s]+(?P<value>\d{1,3})\b",
    r"\b(?P<value>\d{1,3}) years old\b",
]

ISSUE_MARKERS = [
    r"\bi have (?P<value>.+)",
    r"\bi am having (?P<value>.+)",
    r"\bi'm having (?P<value>.+)",
    r"\bi am feeling (?P<value>.+)",
    r"\bi feel (?P<value>.+)",
    r"\bissue is (?P<value>.+)",
    r"\bsuffering from (?P<value>.+)",
]

ALL_KEYWORDS = GENERAL_KEYWORDS | EMERGENCY_KEYWORDS | MENTAL_HEALTH_KEYWORDS


def _normalize_spaces(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip(" ,.-")


def extract_patient_name(message: str) -> str | None:
    for pattern in NAME_PATTERNS:
        match = re.search(pattern, message, flags=re.IGNORECASE)
        if not match:
            continue

        raw_value = _normalize_spaces(match.group("value"))
        words = [word.capitalize() for word in re.findall(r"[A-Za-z]+", raw_value)]
        if not words:
            continue
        if words[0].lower() in NAME_STOPWORDS:
            continue
        return " ".join(words[:3])

    return None


def extract_patient_age(message: str) -> int | None:
    for pattern in AGE_PATTERNS:
        match = re.search(pattern, message, flags=re.IGNORECASE)
        if not match:
            continue

        value = int(match.group("value"))
        if 0 <= value <= 120:
            return value

    return None


def extract_patient_query(message: str) -> str | None:
    for pattern in ISSUE_MARKERS:
        match = re.search(pattern, message, flags=re.IGNORECASE)
        if match:
            candidate = _normalize_spaces(match.group("value"))
            if candidate:
                return candidate

    cleaned = message
    cleaned = re.sub(r"\bmy name is [A-Za-z][A-Za-z\s'-]{1,40}", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bthis is [A-Za-z][A-Za-z\s'-]{1,40}", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bi am \d{1,3}\b", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bi'm \d{1,3}\b", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\bmy age is \d{1,3}\b", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\b\d{1,3} years old\b", "", cleaned, flags=re.IGNORECASE)
    cleaned = _normalize_spaces(cleaned)

    if not cleaned:
        return None

    lowered = cleaned.lower()
    if any(keyword in lowered for keyword in ALL_KEYWORDS):
        return cleaned

    if len(cleaned.split()) >= 5:
        return cleaned

    return None
