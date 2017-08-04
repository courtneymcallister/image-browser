const url = 'http://192.168.1.160/pt-dev/graphics_tool/api_passage.php'
var images = new Vue({
  el: '#images',
  data: {
    passageId: 'passage id',
    itemBank: 'item bank name',
    usable: 'totes usable',
    unusableDetails: 'the deets',
    imageLink: 'image link',
    totalPages: 10000,
    currentPage: 1,
    items: []
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
        console.log(res.data.image_list);
        var itemData = res.data.image_list;
        Object.keys(itemData).forEach(function(listItem){
          images[listItem] = itemData[listItem];
          var passageId = itemData[listItem].passage_id
          this.imageLink = `https://linode.progresstesting.com/item-bank/show/${passageId}`;
        })
        this.items = itemData;
      }.bind(this))
      .catch(err => console.log(err));
    },

    nextPage: function(){
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.getImageData(this.currentPage);
      }
    },

    prevPage: function(){
      if (this.currentPage > 1){
        this.currentPage -= 1;
        this.getImageData(this.currentPage);
      }
    },
  },
  created: function(){
    this.getTotalPages();
    this.getImageData(this.currentPage);
  }
});
