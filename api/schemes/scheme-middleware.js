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
    .catch(next)
    // .catch( err => errCatch(err, req, res, next))
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  scheme_name && scheme_name !== null && typeof(scheme_name) === 'string'
  ? next()
  : res.status(400).json({ message: 'invalid scheme_name' })
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
  const { instructions, step_number } = req.body

  const instrThere = instructions && instructions !== null
  const numValid = typeof(step_number) === 'number' && step_number >= 1

  req.step = { instructions, step_number }

  instrThere && numValid
    ? next()
    : res.status(400).json({ message: 'invalid step' })

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
