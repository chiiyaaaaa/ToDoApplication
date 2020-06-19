import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { toDoDetailsClass } from '../toDoDetailsClass';
import { EditingComponentComponent } from '../editing-component/editing-component.component';
import { Subscription } from 'rxjs';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent implements OnInit, OnDestroy {
  @Input() toDoDetailsDrawList: toDoDetailsClass[];

  //選択されたフォーム情報を格納する変数
  selectedToDoDetails: toDoDetailsClass;

  selectedindex: number;
  
  ToDoListtitle = 'ToDoList';

  //フォームリストの値を保持しておくリスト
  toDoList: toDoDetailsClass[];


  // モーダルダイアログが閉じた際のイベントをキャッチするための subscription
  private subscription: Subscription;

  // ngComponentOutlet にセットするためのプロパティ
  public modal: any = null;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    // モーダルダイアログを閉じた際のイベントを処理する
    this.subscription = this.modalService.closeEventObservable$.subscribe(
      () => {
        // プロパティ modal に null をセットすることでコンポーネントを破棄する
        // このタイミングで ModalComponent では ngOnDestroy が走る
        this.modal = null;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  chenge(index: number) {

    //チェックされたチェックボックスの情報を取得します
    var checkBoxInformation = (<HTMLInputElement>document.getElementById('task' + index)).checked;
   
    //対象のタスク内容の<div>情報を取得します
    const taskContentsInformation = (<HTMLInputElement>document.getElementById('taskdetail' + index));

    //対象のタスク優先度、期限の<div>情報を取得します
    const prioityAndTremInformation = (<HTMLInputElement>document.getElementById('tasktextStateAndTrem' + index));

    //チェックボックスの状態で処理を判断します
    if (checkBoxInformation === true) {
      //グレー色にする
      taskContentsInformation.style.backgroundColor = 'rgb(192,192,192)';    
      prioityAndTremInformation.style.backgroundColor = 'rgb(192,192,192)';
      this.selectedToDoDetails = null;
    }else{
      //元色に戻します
      taskContentsInformation.style.backgroundColor = 'rgb(255,255,255)';    
      prioityAndTremInformation.style.backgroundColor = 'rgb(241, 241, 241)';
    }
  }

  deletebutton(index: number) {
    const result = confirm("選択されたリストの削除を行いますか？");
    if( result == true ) {
      //選択されたリストの削除を行います
      this.toDoDetailsDrawList.splice(index,1);
      this.selectedToDoDetails = null;
    }
  }

  editingbutton(selectedtaskDetails: toDoDetailsClass , index: number){    
    //チェックされたチェックボックスの情報を取得します
    const checkBoxInformation = (<HTMLInputElement>document.getElementById('task' + index)).checked;

    this.selectedindex = index;

    if(checkBoxInformation === false) {
      //選択されたフォームの情報を受け渡します
      this.selectedToDoDetails = null;
      this.selectedToDoDetails = selectedtaskDetails;
      //編集画面を表示できるようにします
      (<HTMLInputElement>document.getElementById('overlay')).style.display = 'block';
      (<HTMLInputElement>document.getElementById('modal')).style.display = 'block';
      //モーダルウィンドウ
      this.modal = EditingComponentComponent;
    }else {
      this.selectedToDoDetails = null;
    }
  }
}
