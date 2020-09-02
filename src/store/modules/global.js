const requireComponent = require.context(
  '.',
  false,
  /\.js$/
)
export default requireComponent.keys().reduce((all, fileName) => {
  const module = requireComponent(fileName).default
  if (module) {
    all[fileName.match(/([^./]+).js/)[1]] = module
  }
  return all
}, {})
