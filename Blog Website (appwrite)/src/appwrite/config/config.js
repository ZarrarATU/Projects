import { conf } from "../../conf/conf";
import { Client, ID, Storage, Query, TablesDB } from "appwrite";


class Database {
  client = new Client()
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)

    this.databases = new TablesDB(this.client)
    this.storage = new Storage(this.client)

  }

  // create new post saar 
  async createPost({ title, slug, content, featuredIMG, status, userID }) {
    try {
      await this.databases.createRow({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        rowId: ID.unique(),
        data: {
          title,
          slug,
          content,
          featuredIMG,
          status,
          userID,
        }
      })
      return true

    } catch (error) {
      console.log(`APPWRITE-CREATEPOST-ERROR: ${error}`);
      return false
    }
  }

  // update post saar 
  async updatePost({ title, slug, rowId, content, featuredIMG, status, userID }) {
    try {
      await this.databases.updateRow(
        conf.appwriteDbId,
        conf.appwriteTableId,
        rowId,
        {
          title,
          content,
          featuredIMG,
          status,
          userID,
          slug,
        }
      )
      return true
    } catch (error) {
      console.log(`updateRow Error: ${error}`);
      return false
    }



  }

  // delete post saar
  async deletePost() {

    try {
      await this.databases.deleteRow(
        conf.appwriteDbId,
        conf.appwriteTableId,
      )
      return true
    } catch (error) {
      console.log(`deletePost Error: ${error}`);
      return false
    }
  }

  // get post saar
  async getPost(rowId) {
    try {
      await this.databases.getRow({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        rowId,
      })
      return true
    } catch (error) {
      console.log(`getPost Error: ${error}`);
      return false
    }
  }

  // get posts saar
  async listPosts(){
    try {
      await this.databases.listRows({
        databaseId: conf.appwriteDbId,
        tableId: conf.appwriteTableId,
        queries: [Query.equal('status','active')],
      })
    } catch (error) {
      console.log(`listPosts Error: ${error}`);
      
    }
  }

  // upload file saar
  async uploadFile(file){
    try {
      await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      })
      return true
    } catch (error) {
      console.log(`uploadFile Error: ${error}`);
      return false
    }
  }

  // delete post saar 
  async deleteFile(fileId){
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      })
    } catch (error) {
      console.log(`deletePost Error: ${error}`);
      
    }
  }

  // get file preview 
  async getFilePreview(fileId){
    try {
      let file = await this.storage.getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId: fileId
      })

      return file
      
    } catch (error) {
      console.log(`getFilePreview Error: ${error}`);
      return false
    }
  }
}




export const dataBase = new Database()