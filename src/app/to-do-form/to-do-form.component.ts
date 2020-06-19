import { Component, OnInit } from '@angular/core';
import { toDoDetailsClass } from '../toDoDetailsClass';
import { Subscription } from 'rxjs';

// モーダルダイアログとして表示するコンポーネント
// import { ModalComponent } from '../modal/modal.component';

// モーダルダイアログを閉じるためのイベントを管理するサービス
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {

  toDoFormTitle = '入力フォーム';

  //toDoDetailsClassのリスト作成
  toDoDetailsList: toDoDetailsClass[];

  toDoDetailArray: toDoDetailsClass;

  // モーダルダイアログが閉じた際のイベントをキャッチするための subscription
  private subscription: Subscription;

  // ngComponentOutlet にセットするためのプロパティ
  public modal: any = null;
  
  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.setTimeInit();
    this.setRadioSelectInit();
    this.toDoDetailArray = new toDoDetailsClass();
    this.toDoDetailsList = new Array<toDoDetailsClass>();

    //ボタンの操作を有効にします
    var fromaddbutton  = (<HTMLInputElement>document.getElementById('addbutton'));
    fromaddbutton.disabled  = false;
  }

  /**
   * 期限に現在の日付を初期設定するメソッド
   */
  setTimeInit() {
    var setTaskTerm = (<HTMLInputElement>document.getElementById('taskcalendar'));
    var date = new Date();

    var yyyy = date.getFullYear();
    var mm = ("0"+(date.getMonth()+1)).slice(-2);
    var dd = ("0"+date.getDate()).slice(-2);
    
    setTaskTerm.value = yyyy+'-'+mm+'-'+dd;

  }

  /**
   * 優先度に「中」を初期設定するメソッド
   */
  setRadioSelectInit() {
    //Center
     var setCenterRadioState = (<HTMLInputElement>document.getElementById('center_priority'));
     setCenterRadioState.checked = true;
  }

  addButtonClick(){
   
    //エラーチェック
    var errorCheckFlg: Boolean = false;

    //タスク内容を取得します
    var taskdetailText = (<HTMLInputElement>document.getElementById('name'));

    //タスク内容が空か同か判定します
    if(taskdetailText.value === "") {
      errorCheckFlg = true;
    }

    //タスク期限を取得します
    const taskTerm = (<HTMLInputElement>document.getElementById('taskcalendar'));
    //タスク期限が空か同か判定します
    if (taskTerm.value === "") {
      errorCheckFlg = true;
    }

    if (errorCheckFlg === false) {
      //各種ラジオの状態を取得します
      //高
      const taskdetailHeightRadioState = (<HTMLInputElement>document.getElementById('high_priority'));
      //中
      const taskdetailCenterRadioState = (<HTMLInputElement>document.getElementById('center_priority'));
      //低
      const taskdetailLowRadioState = (<HTMLInputElement>document.getElementById('low_priority'));

      //フォームの情報をリストに格納します
      const toDoDetailArray = new toDoDetailsClass();

      toDoDetailArray.taskdetailText = taskdetailText.value;
      //タスク優先度は何が選択されているかを判断します
      if (taskdetailHeightRadioState.checked === true) {
        toDoDetailArray.taskdetailState = taskdetailHeightRadioState.value;
      } 
      else if (taskdetailCenterRadioState.checked === true) {
        toDoDetailArray.taskdetailState = taskdetailCenterRadioState.value;
      } 
      else {
        toDoDetailArray.taskdetailState = taskdetailLowRadioState.value;
      }
        toDoDetailArray.taskdetailTerm = taskTerm.value;

      //タスクの情報をリストにpushします
      this.toDoDetailsList.push(toDoDetailArray);

      //タスク内容を空にします
      taskdetailText.value = null;



    } else {
      alert('フォームの内容にエラーが発生しました');
    }
  }
}