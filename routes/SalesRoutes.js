const express = require('express');
const router = express.Router();
const SalesController = require('../controller/SalesController');

/** 
 * @swagger 
 * definitions:
 *   RegisterModel:
 *     properties:
 *       UserName:
 *         type: string
 *         required: true
 *         description: Enter UserName.
 *       Amount:
 *         type: integer
 *         required: true
 *         description: Enter LastName.
 */
/** 
 * @swagger
/sales/register: 
*   post: 
*     description: Register data.
*     tags:
*     - Sales
*     parameters: 
*     - name: Model 
*       description: Data Registration. 
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/RegisterModel'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Register successful.
*       400:
*         description: Something went wrong!! Please try again later!!!.
*       500:
*         description: Internal server error.   
*   
*/
router.post('/register', function (req, res) {
    SalesController.SalesRegistration(req, res);
});

/** 
  * @swagger
 /sales/status/{status}: 
 *   post: 
 *     description: Get sales status
 *     tags:
 *       - Sales 
 *     parameters: 
 *     - name: status 
 *       description: It can be daily,weekly or monthly.
 *       in: path 
 *       required: true
 *     produces:
 *       - application/json
 *     responses:  
 *       200: 
 *         description: Data found.
 *       400:
 *         description: Something went wrong!! Please try again later!!!.
 *       402:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.        
 *   
 */
router.post('/status/:status', function (req, res) {
    SalesController.SalesStatus(req, res);
});
module.exports = router;