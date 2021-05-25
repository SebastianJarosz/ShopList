import { IPostData } from "../interface/IPostData";

export class ShopListModel implements IPostData{
    id?: number;
    listName?: string;
    listPostion?: string | any;
    creationDate?: string;
    lastModficationDate?: string;
    shopPrice?: number;
    status?: number;

    constructor(id: number, listName: string, listPostion: string,
        creationDate: string, lastModficationDate: string, shopPrice: number, status: number){
        this.id = id
        this.listName = listName;
        this.listPostion = listPostion;
        this.creationDate =  creationDate;
        this.lastModficationDate = lastModficationDate;
        this.shopPrice = shopPrice;
        this.status = status;}
}

export class ListPostionModel{
    posName?: string;
    quantity?: number;
    unit?: string;
}