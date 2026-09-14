const api = require("../../utils/api");
const { salary, visaText } = require("../../utils/format");

Page({
  data: {
    loading: true,
    offline: false,
    error: "",
    digest: null,
    jobs: [],
    q: "",
    category: "",
    cats: [],
  },

  onShow() {
    this.load();
  },

  onPullDownRefresh() {
    this.load().finally(() => wx.stopPullDownRefresh());
  },

  async load() {
    this.setData({ loading: true, error: "" });
    const { data, offline, error } = await api.getToday();
    if (!data) {
      this.setData({ loading: false, error: error || "今天还没有日报" });
      return;
    }
    const cats = uniqueCats(data.jobs || []);
    this.setData({
      loading: false,
      offline,
      digest: data,
      cats,
      jobs: this.filterJobs(data.jobs || [], this.data.q, this.data.category),
    });
  },

  filterJobs(jobs, q, category) {
    const keyword = (q || "").trim().toLowerCase();
    return (jobs || [])
      .filter((job) => !category || job.category === category)
      .filter((job) => {
        if (!keyword) return true;
        const hay = `${job.title} ${job.company} ${job.headline}`.toLowerCase();
        return hay.includes(keyword);
      })
      .map((job) => ({
        ...job,
        salaryText: salary(job),
        visaText: visaText(job),
      }));
  },

  onSearch(e) {
    const q = e.detail.value;
    this.setData({
      q,
      jobs: this.filterJobs(this.data.digest.jobs, q, this.data.category),
    });
  },

  onCat(e) {
    const category = e.currentTarget.dataset.cat;
    this.setData({
      category,
      jobs: this.filterJobs(this.data.digest.jobs, this.data.q, category),
    });
  },

  openJob(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/job/job?id=${id}` });
  },

  openDigest() {
    const date = this.data.digest && this.data.digest.date;
    if (date) wx.navigateTo({ url: `/pages/digest/digest?date=${date}` });
  },
});

function uniqueCats(jobs) {
  const map = {};
  (jobs || []).forEach((job) => {
    map[job.category] = job.categoryZh;
  });
  return Object.keys(map).map((id) => ({ id, name: map[id] }));
}
