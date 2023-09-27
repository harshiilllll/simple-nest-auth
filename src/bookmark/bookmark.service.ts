import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService {

    bookmarks(){
        return "list of bookmarks"
    }
}
