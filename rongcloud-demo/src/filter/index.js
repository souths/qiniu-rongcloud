export default {
  mo(val) {
    let newVal = val.replace(/(\S+)\s(\S+)/g,'$1').replace(/(\d+)-(\d+)-(\d+)/g,'$1/$2/$3')
    return newVal
  }
}
