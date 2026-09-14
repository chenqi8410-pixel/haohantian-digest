App({
  globalData: {
    favs: [],
  },
  onLaunch() {
    this.globalData.favs = wx.getStorageSync("meipin-favs") || [];
  },
  toggleFav(id) {
    const favs = this.globalData.favs.slice();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1);
    else favs.push(id);
    this.globalData.favs = favs;
    wx.setStorageSync("meipin-favs", favs);
    return favs.includes(id);
  },
  hasFav(id) {
    return this.globalData.favs.includes(id);
  },
});
