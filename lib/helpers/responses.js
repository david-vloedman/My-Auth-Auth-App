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