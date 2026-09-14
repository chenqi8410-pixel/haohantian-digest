const api = require("../../utils/api");
const { salary, visaText } = require("../../utils/format");

Page({
  data: {
    loading: true,
    error: "",
    job: null,
    saved: false,
  },

  onLoad(query) {
    this.id = query.id;
    this.load();
  },

  async load() {
    this.setData({ loading: true, error: "" });
    const { data, error } = await api.getJob(this.id);
    if (!data) {
      this.setData({ loading: false, error: error || "职位不存在" });
      return;
    }
    this.setData({
      loading: false,
      saved: getApp().hasFav(data.id),
      job: {
        ...data,
        salaryText: salary(data),
        visaText: visaText(data),
      },
    });
    wx.setNavigationBarTitle({ title: data.company || "职位详情" });
  },

  toggleFav() {
    const saved = getApp().toggleFav(this.data.job.id);
    this.setData({ saved });
    wx.showToast({ title: saved ? "已收藏" : "已取消", icon: "none" });
  },

  copyLink() {
    const url = this.data.job.applyUrl;
    if (!url) {
      wx.showToast({ title: "没有申请链接", icon: "none" });
      return;
    }
    wx.setClipboardData({ data: url });
  },

  openLink() {
    const url = this.data.job.applyUrl;
    if (!url) return;
    wx.setClipboardData({
      data: url,
      success: () => wx.showToast({ title: "链接已复制，请在浏览器打开", icon: "none" }),
    });
  },
});
