import time
import requests

API_KEY = "set from environment"
SITE_ID = "set from environment"

RETRY_STATUS = {429, 502, 503, 504}


def headers():
    return {
        "Authorization": API_KEY,
        "wix-site-id": SITE_ID,
        "Content-Type": "application/json",
    }


def post_json(url, payload, retries=3):
    for index in range(retries):
        response = requests.post(url, json=payload, headers=headers(), timeout=30)
        if response.ok:
            return response.json() if response.content else {}

        should_retry = response.status_code in RETRY_STATUS and index < retries - 1
        if should_retry:
            time.sleep(1.5 * (index + 1))
            continue

        raise RuntimeError(f"{response.status_code}: {response.text}")
