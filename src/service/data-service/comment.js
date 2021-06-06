'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  create(offer, comment) {
    const newComment = {
      ...comment,
      id: nanoid(MAX_ID_LENGTH),
    };

    offer.comments = [
      ...offer.comments,
      newComment
    ];
    return comment;
  }

  drop(offer, commentId) {
    const dropComment = offer.comments
      .find(({id}) => id === commentId);

    if (!dropComment) {
      return null;
    }

    offer.comments = offer.comments
      .filter(({id}) => id !== commentId);

    return dropComment;
  }

  findAll(offer) {
    return offer.comments;
  }

}

module.exports = CommentService;
