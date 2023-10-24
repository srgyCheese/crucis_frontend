export function file2Buffer(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    const readFile = function (event) {
      const buffer = reader.result
      resolve(buffer)
    }

    reader.addEventListener('load', readFile)
    reader.readAsArrayBuffer(file)
  })
}