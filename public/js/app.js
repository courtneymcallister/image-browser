const url = 'http://192.168.1.160/pt-dev/graphics_tool/api_passage.php'
var images = new Vue({
  el: '#images',
  data: {
    totalPages: 10000,
    currentPage: 1,
    jumpTo: this.currentPage,
    toggle: true,
    items: [],
    itemType: ''
  },
  methods: {
    getTotalPages: function(){
      axios.post(url, {
        'command': 'passage_get_page_count'
      })
      .then(function(res){
        images.totalPages = res.data.num_pages;
      })
      .catch(err => console.log(err));
    },

    getImageData: function(page){
      axios.post(url, {
        'command': 'passage_get_page_data',
        'page_number': this.currentPage
      })
      .then(function(res){
        var itemData = res.data.image_list;
        Object.keys(itemData).forEach(function(listItem){
          images[listItem] = itemData[listItem];
        })
        this.items = itemData;
      }.bind(this))
      .catch(err => console.log(err));
    },

    nextPage: function(){
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.getImageData(this.currentPage);
        scroll(0, 0);
      }
    },

    prevPage: function(){
      if (this.currentPage > 1){
        this.currentPage -= 1;
        this.getImageData(this.currentPage);
        scroll(0, 0);
      }
    },
    updatePage: function(n){
      if (n > 0 && n <= this.totalPages){
        this.currentPage = n;
        this.jumpTo = this.currentPage;
        this.getImageData(this.currentPage);
      }
      this.jumpTo = '';
    },

    toggleItems: function(){
      images.updatePage(this.currentPage);
    },
  },
  created: function(){
    this.getTotalPages();
    this.getImageData(this.currentPage);
  }
});
