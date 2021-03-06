/**
 * Created by giovanni on 01/10/17.
 */

/**
 * @apiDefine singleReadSuccessResponse
 @apiSuccessExample {json} Success-Response:
{
    "options": [
    {
        "body": "body",
        "audio": "audio.mp3",
        "correct": false,
        "_id": "5a9946d7895e9c001de1ec74"
    },
    {
        "body": "body2",
        "audio": "audio2.mp3",
        "correct": true,
        "_id": "5a9946d7895e9c001de1ec73"
    }
],
    "_id": "5a9946d7895e9c001de1ec75",
    "unit_id": 1,
    "title": "title",
    "picture": "picture.png"
}
 */

/**
 * @api {get} /api/cms/read Get list of reads
 * @apiGroup Read
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
[
    {
        "options": [
            {
                "body": "body",
                "audio": "audio.mp3",
                "correct": false,
                "_id": "5a9946d7895e9c001de1ec74"
            },
            {
                "body": "body2",
                "audio": "audio2.mp3",
                "correct": true,
                "_id": "5a9946d7895e9c001de1ec73"
            }
        ],
        "_id": "5a9946d7895e9c001de1ec75",
        "unit_id": 1,
        "title": "title",
        "picture": "picture.png"
    },
    {
        "options": [
            {
                "body": "body",
                "audio": "audio.mp3",
                "correct": false,
                "_id": "5a994797895e9c001de1ec9a"
            },
            {
                "body": "body2",
                "audio": "audio2.mp3",
                "correct": true,
                "_id": "5a994797895e9c001de1ec99"
            }
        ],
        "_id": "5a994797895e9c001de1ec9b",
        "unit_id": 1,
        "title": "title2",
        "picture": "picture2.png"
    }
]
 */

/**
 * @api {get} /api/cms/read/unit_id/:unit_id Finds reads by unit_id
 * @apiGroup Read
 * @apiUse authHeader
 *
 @apiSuccessExample {json} Success-Response:
 [
 {
     "options": [
         {
             "body": "body",
             "audio": "audio.mp3",
             "correct": false,
             "_id": "5a9946d7895e9c001de1ec74"
         },
         {
             "body": "body2",
             "audio": "audio2.mp3",
             "correct": true,
             "_id": "5a9946d7895e9c001de1ec73"
         }
     ],
     "_id": "5a9946d7895e9c001de1ec75",
     "unit_id": 1,
     "title": "title",
     "picture": "picture.png"
 },
 {
     "options": [
         {
             "body": "body",
             "audio": "audio.mp3",
             "correct": false,
             "_id": "5a994797895e9c001de1ec9a"
         },
         {
             "body": "body2",
             "audio": "audio2.mp3",
             "correct": true,
             "_id": "5a994797895e9c001de1ec99"
         }
     ],
     "_id": "5a994797895e9c001de1ec9b",
     "unit_id": 1,
     "title": "title2",
     "picture": "picture2.png"
 }
 ]
 */

/**
 * @api {get} /api/cms/read/:id Find read by ID
 * @apiGroup Read
 * @apiUse authHeader
 * @apiUse singleReadSuccessResponse
 */

/**
 * @api {post} /api/cms/read Add a new read
 * @apiGroup Read
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "title": "title",
    "picture": "picture.png",
    "options": [
    {
        "body": "body",
        "audio": "audio.mp3",
        "correct": false
    },
    {
        "body": "body2",
        "audio": "audio2.mp3",
        "correct": true
    }
]
}
 * @apiUse singleReadSuccessResponse
 */

/**
 * @api {put} /api/cms/read/:id Update an existing read
 * @apiGroup Read
 * @apiUse authHeader
 *
 * @apiParamExample {json} Request-Example:
{
    "unit_id": 1,
    "picture": "newPicture.png",
    "title": "newTitle",
    "options": [
    {
        "body": "newBody",
        "audio": "newAudio.mp3",
        "correct": true
    },
    {
        "body": "newBody",
        "audio": "newAudio2.mp3",
        "correct": false
    }
]
}
 * @apiUse singleReadSuccessResponse
 */

/**
 * @api {delete} /api/cms/read/:id Deletes a read
 * @apiGroup Read
 * @apiUse authHeader
 */