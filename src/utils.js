class Utils {
  static load_obj(state) {
    return Utils.merge(state,
      Utils.json_get(state.ikey));
  }
  static json_get(ikey) {
    let data = localStorage.getItem(ikey);
    return data ? JSON.parse(data) : {};
  }
  static merge(target, extra) {
    Object.assign(target, extra);
  }
}; export default Utils;
