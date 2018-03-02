/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @api {get} /api/write Creates list of writes
 * @apiGroup Write
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
[
    {
        "letters": [
            "a",
            "b"
        ],
        "_id": "5a9941671edae8007cc896a9",
        "unit_id": 1,
        "picture": "picture.png",
        "word": "word"
    },
    {
        "letters": [
            "c",
            "d"
        ],
        "_id": "5a9941921edae8007cc896aa",
        "unit_id": 1,
        "picture": "picture2.png",
        "word": "word2"
    }
]
 */

/**
 * @api {get} /api/write/:id Find write by ID
 * @apiGroup Write
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
{
    "letters": [
    "a",
    "b"
],
    "_id": "5a9941671edae8007cc896a9",
    "unit_id": 1,
    "picture": "picture.png",
    "word": "word"
}
 */

/**
 * @api {post} /api/write Add a new write
 * @apiGroup Write
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "picture.png",
    "word": "word",
    "letters": [
    "a",
    "b"
]
}
 */

/**
 * @api {put} /api/write/:id Update an existing write
 * @apiGroup Write
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "newPicture.png",
    "word": "newWord",
    "letters": [
    "a",
    "b"
]
}
 */

/**
 * @api {delete} /api/write/:id Deletes a write
 * @apiGroup Write
 * @apiUse authHeader
 */