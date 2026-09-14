const config = require("../../config");
const offline = require("../../data/offline");
const { salary } = require("../../utils/format");

Page({
  data: {
    apiBase: "",
    favs: [],
    offlineDate: offline.todayDate,
  },

  onShow() {
    const ids = getApp().globalData.favs || [];
    const favs = ids
      .map((id) => offline.getJob(id))
      .filter(Boolean)
      .map((job) => ({ ...job, salaryText: salary(job) }));
    this.setData({ apiBase: config.apiBase, favs });
  },

  copyApi() {
    wx.setClipboardData({ data: this.data.apiBase });
  },

  openJob(e) {
    wx.navigateTo({ url: `/pages/job/job?id=${e.currentTarget.dataset.id}` });
  },
});
