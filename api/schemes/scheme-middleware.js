const schemes = require('./scheme-model.js')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params

  schemes.findById(scheme_id)
    .then(scheme => {
      if(scheme){
        req.scheme = scheme
        next()
      } else {
        res.status(404).json({ message: `scheme with scheme_id ${scheme_id} not found` })
      }
    })
    .catch( err => errCatch(err, req, res, next))
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

const errCatch = (err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: 'Finding the real error is 90% of the bug fix',
    message: err.message,
    stack: err.stack,
  })
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
