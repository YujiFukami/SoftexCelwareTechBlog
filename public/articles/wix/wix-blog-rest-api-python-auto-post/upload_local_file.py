import mimetypes
from pathlib import Path

import requests


def upload_local_file(path):
    file_path = Path(path)
    data = file_path.read_bytes()
    mime_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"

    upload_ticket = post_json(
        "https://www.wixapis.com/site-media/v1/files/generate-upload-url",
        {
            "mimeType": mime_type,
            "fileName": file_path.name,
            "sizeInBytes": str(len(data)),
        },
    )

    response = requests.put(
        upload_ticket["uploadUrl"],
        params={"filename": file_path.name},
        headers={"Content-Type": mime_type},
        data=data,
        timeout=120,
    )
    response.raise_for_status()

    image = response.json()["file"]["media"]["image"]["image"]
    return {
        "id": image["id"],
        "url": image["url"],
        "width": image.get("width"),
        "height": image.get("height"),
    }
