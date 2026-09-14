const api = require("../../utils/api");

Page({
  data: {
    loading: true,
    offline: false,
    error: "",
    items: [],
  },

  onShow() {
    this.load();
  },

  onPullDownRefresh() {
    this.load().finally(() => wx.stopPullDownRefresh());
  },

  async load() {
    this.setData({ loading: true, error: "" });
    const { data, offline, error } = await api.getDigests();
    if (!data || !data.items) {
      this.setData({ loading: false, error: error || "还没有往期日报" });
      return;
    }
    this.setData({ loading: false, offline, items: data.items });
  },

  openDigest(e) {
    const date = e.currentTarget.dataset.date;
    wx.navigateTo({ url: `/pages/digest/digest?date=${date}` });
  },
});
