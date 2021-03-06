import AbstractMaterial from '@/app/base/AbstractMaterial';
import DataBackAction from '@/app/base/net/DataBackAction';
import Message from '@/app/base/message/Message';
import HttpUtil from '@/app/lib/util/HttpUtil';

export default class ContactCategoryController extends AbstractMaterial {
  public addContactCategory(userId: string, name: string, back: DataBackAction): void {
    const body = {
      userId: userId,
      name: name
    }
    const m = Message.build('post', '/modules/addContactCategory')
    m.body = body
    this.appContext.netServer.request(m, back)
  }

  public addGroupCategory(userId: string, name: string, back: DataBackAction): void {
    const body = {
      userId: userId,
      name: name
    }
    const m = Message.build('post', '/modules/addGroupCategory')
    m.body = body
    this.appContext.netServer.request(m, back)
  }

  public toggleClass(data: any, back: DataBackAction) {
    HttpUtil.request('post', '/user/toggleClass', data, back, false)
  }
}