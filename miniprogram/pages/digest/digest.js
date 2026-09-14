const api = require("../../utils/api");
const { salary, visaText } = require("../../utils/format");

Page({
  data: {
    loading: true,
    error: "",
    digest: null,
    jobs: [],
  },

  onLoad(query) {
    this.date = query.date;
    this.load();
  },

  async load() {
    this.setData({ loading: true, error: "" });
    const { data, error } = await api.getDigest(this.date);
    if (!data) {
      this.setData({ loading: false, error: error || "没有这一天的日报" });
      return;
    }
    this.setData({
      loading: false,
      digest: data,
      jobs: (data.jobs || []).map((job) => ({
        ...job,
        salaryText: salary(job),
        visaText: visaText(job),
      })),
    });
    wx.setNavigationBarTitle({ title: data.date || "日报详情" });
  },

  openJob(e) {
    wx.navigateTo({ url: `/pages/job/job?id=${e.currentTarget.dataset.id}` });
  },
});
