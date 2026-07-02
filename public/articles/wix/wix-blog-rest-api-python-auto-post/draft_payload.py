draft_post = {
    "title": title,
    "richContent": ricos_content,
    "memberId": member_id,
    "excerpt": excerpt,
    "seoSlug": slug,
    "seoData": {
        "tags": [
            {
                "type": "meta",
                "props": {
                    "name": "description",
                    "content": meta_description,
                },
            }
        ]
    },
    "heroImage": {
        "id": hero_image["id"],
        "url": hero_image["url"],
        "width": hero_image.get("width"),
        "height": hero_image.get("height"),
    },
    "categoryIds": category_ids,
    "tagIds": tag_ids,
    "hashtags": hashtags,
}

payload = {
    "draftPost": draft_post,
    "publish": False,
    "fieldsets": ["URL"],
}

created = post_json(
    "https://www.wixapis.com/blog/v3/draft-posts",
    payload,
)
