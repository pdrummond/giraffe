CreateCommentBoxComponent = CreateBoxComponent.extendComponent({
  getMessageAttrs: function() {    
    return {
      messageType: 'commentMessage',
      parentMessageId: this.data()._id,
      parentMessageGid: this.data().gid,
    };
  },
}).register('CreateCommentBoxComponent');
