import axiosInst from "../../Config";

export const TrackSongs_Api = async () => await axiosInst.get(`getallsong.php`);

export const UploadSong_Api = async (File) =>
  await axiosInst.post(`uploadsong.php`, { PlayList: File });

export const PlayLists_Api = async () => await axiosInst.get(`playlists.php`);

export const AddPlayListSongs_Api = async (id) =>
  await axiosInst.get(`adddeleteplaylistsong.php?id=${id}`);

export const AddSongs_Api = async (data) =>
  await axiosInst.post(`addsong.php?plid=${data.plid}&sid=${data.sid}`);

export const DeleteSongs_Api = async (data) =>
  await axiosInst.delete(`addsong.php?plid=${data.plid}&sid=${data.sid}`);

export const PlayListSearch_Api = async (data) =>
  await axiosInst.get(
    `playlistSearch.php?search=${data.Search}&plid=${data.plid}`
  );

export const TrackSearch_Api = async (data) =>
  await axiosInst.get(`tracksongsearch.php?search=${data}`);

export const PlayListSongsPlay_Api = async (data) =>
  await axiosInst.get(`playlistsongplay.php?plid=${data}`);
