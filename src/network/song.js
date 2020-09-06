import {request} from './request'

export function getBanner(url){
  return request({
    url: url
  })
}
//推荐歌单 tracks歌曲
export function getPlaylist(){
  return request({
    url: '/personalized?limit=4'
  })
}
/// 获取歌单详情
export function getPLDetail(id){
  return request({
    url: '/playlist/detail',
    params:{
      id
    }
    //s : 歌单最近的 s 个收藏者,默认为8
  })
}
//新碟（专辑）上架 
export function getNewSong(f){
  return request({
    url: '/top/album',
    params:{
      offset: f,
      limit: 5,
      //area: "all",
      type: "new",
      year: 2020,
      month:9
    }
  })
}
//获取专辑
export function getAlbum(id){
  return request({
    url: '/album',
    params:{
      id
    }
  })
}
//不一定能获得url
//专辑id -》 -》url
export function getSongUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
//获取歌曲歌词
export function getSongLyric(id){
  return request({
    url: '/lyric',
    params:{
      id
    }
  })
}
//获取歌曲详情
export function getSongDetail(id){
  return request({
    url:'/song/detail',
    params:{
      ids: id
    }
  })
}
export function search(word){
  return request({
    url: '/search',
    params:{
      keywords: word
    }
  })
}