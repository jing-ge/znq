var API_URL = 'http://119.29.147.179/znq/public/index.php/index/index/';


//获取所有内容（以后改进）
function _getContent(uid){
  return API_URL+'getContent?uid='+uid;
}
//增加用户
function _addUser() {
  return API_URL + 'addUser';
}
//根据id获取内容
function _getContentById(id,uid){
  return API_URL +'getContentById?id='+id+'&uid='+uid;
}
//根据内容id获取评论列表
function _getCommentsByContentId(id){
  return API_URL + 'getCommentsByContentId?id=' +id;
}
function _getTopic(){
  return  API_URL +'gettopic';
}
function _getContentByTopicId(id){
  return API_URL + 'getContentByTopicId?id=' +id;
}
function _getHotContent(uid){
  return API_URL + "getHotContent?uid=" +uid;
}
function _getTopicName(){
  return API_URL + "getTopicName";
}
function _insertContent(){
  return API_URL + "insertContent";
}
function _insertComment(){
  return API_URL + 'insertComment';
}
function _getContentByUserId(uid){
  return API_URL + 'getContentByUserId?uid=' +uid;
}
function _dianzan(content_id,uid,action){
  return API_URL + 'dianzan?content+id=' + content_id+'&uid=' + uid + '&action=' + action;
}
function _shoucang(content_id, uid, action) {
  return API_URL + 'shoucang?content_id=' + content_id + '&uid=' + uid + '&action=' + action;
}
function _getShoucangContent(uid){
  return API_URL + "getShoucangContent?uid=" + uid;
}
function _getZanContent(uid) {
  return API_URL + "getZanContent?uid=" + uid;
}
module.exports = {
  getContent:_getContent,
  addUser:_addUser,
  getContentById:_getContentById,
  getCommentsByContentId: _getCommentsByContentId,
  getTopic: _getTopic,
  getContentByTopicId: _getContentByTopicId,
  getHotContent: _getHotContent,
  getTopicName: _getTopicName,
  insertContent: _insertContent,
  insertComment: _insertComment,
  getContentByUserId: _getContentByUserId,
  dianzan: _dianzan,
  shoucang: _shoucang,
  getShoucangContent: _getShoucangContent,
  getZanContent: _getZanContent
};