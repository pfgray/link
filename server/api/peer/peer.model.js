var _ = require('lodash');

var Q = require('q');
var mongodb = require('mongodb');
var model = require('../../database');
var collection = 'peers';

module.exports = {
    getPeer:function(db, peerId){
      return Q.ninvoke(db.collection(collection), 'findOne', {
        _id: new mongodb.ObjectID(peerId)
      });
    },
    getPeersByUser:function(db, userId){
      return Q.ninvoke(db.collection(collection).find({
        userId: userId
      }), 'toArray');
    },
    updatePeer:function(db, peer){
      console.log("saving peer:", peer);
      return Q.ninvoke(db.collection(collection), 'save', peer);
    },
    createPeer:function(db, peer){
      return Q.ninvoke(db.collection(collection), 'insert', peer)
        .then(function(result){
          return result.ops[0];
        });
    },
    deletePeer:function(db, id){
      return Q.ninvoke(db.collection(collection), 'remove', {
        _id: new mongodb.ObjectID(id)
      });
    }
}
