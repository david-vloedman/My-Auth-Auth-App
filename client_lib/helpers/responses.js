export const forbidden = (res) => {
  return res.status(403).json({
    status: 'fail',
    message: 'Forbidden',
  })
}

export const notFound = (res, message) => {
  return res.status(404).json({
    status: 'fail',
    message
  })
}

export const ok = (res, message, data) => {
  return res.status(200).json({
    status: 'success',
    message,
    data
  })
}

export const serverError = (res, message, data) => {
  return res.status(500).json({
    status: 'error',
    message,
    data
  })
}