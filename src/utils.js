class Utils {
  static obj_queue = {
    'update': new Set(),
    'remove': new Set(),
  }
  static rm_obj(ikey) {
    localStorage.removeItem(ikey)
    Utils.obj_queue['remove'].add(ikey)
  }
  static save_obj(target) {
    let x = target.state; x._tick = Date.now()
    Utils.obj_queue['update'].add(x.ikey)
    return () => localStorage.setItem(x.ikey,
      JSON.stringify(x))
  }
  static load_obj(state) {
    return Utils.merge(state,
      Utils.json_get(state.ikey))
  }
  static json_get(ikey) {
    let data = localStorage.getItem(ikey)
    return data ? JSON.parse(data) : {}
  }
  static merge(target, extra) {
    return Object.assign(target, extra)
  }
}; export default Utils;
