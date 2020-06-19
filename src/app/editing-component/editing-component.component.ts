import { Component, OnInit, Input } from '@angular/core';
import { toDoDetailsClass } from '../toDoDetailsClass';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, from } from 'rxjs';

// モーダルダイアログを閉じるためのイベントを管理するサービス
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-editing-component',
  templateUrl: './editing-component.component.html',
  styleUrls: ['./editing-component.component.css']
})
export class EditingComponentComponent implements OnInit {
  @Input() selectedToDoDetails: toDoDetailsClass;
  @Input() selectedindex:number;
  @Input() toDoList: toDoDetailsClass[];

 
  savetask: toDoDetailsClass;

  // モーダルダイアログが閉じた際のイベントをキャッチするための subscription
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  
  //@Input 経由で入力値が設定されたときに実行される	
  ngOnChanges() {
    this.savetask = new toDoDetailsClass();
    this.savetask.taskdetailText = this.selectedToDoDetails.taskdetailText;
    this.savetask.taskdetailState = this.selectedToDoDetails.taskdetailState;
    this.savetask.taskdetailTerm = this.selectedToDoDetails.taskdetailTerm;
  }

  finshButton() {
     //エラーチェック
     var errorflg = false; 
    
     var editingformtaskValue = (<HTMLInputElement>document.getElementById('editingtaskdetail'));
     if (editingformtaskValue.value === "") {
       alert('タスク内容が空白になってます');
       errorflg = true;
       //編集前のタスク内容を表示させます
       this.toDoList[this.selectedindex].taskdetailText = this.savetask.taskdetailText;
     }

     var editingformtremValue =  (<HTMLInputElement>document.getElementById('editingtaskTerm'));
     if ( editingformtremValue.value === "") {
       alert('期限の設定を見直してください');    
       errorflg = true;
       //編集前のタスク内容を表示させます
       this.toDoList[this.selectedindex].taskdetailTerm = this.savetask.taskdetailTerm;
     }

     //追加ボタンの操作を無効にします
     var fromAddbutton  = (<HTMLInputElement>document.getElementById('addbutton'));
     //チェックボックスの操作を無効にします
     var taskcheck  = (<HTMLInputElement>document.getElementById('task' + this.selectedindex));
     if(errorflg === true) {
       fromAddbutton.disabled  = true;
       taskcheck.disabled = true;
     }
    
     if (errorflg === false) {
       //変更後の値を取得します
       this.savetask.taskdetailText = editingformtaskValue.value;
       this.savetask.taskdetailTerm = editingformtremValue.value;

        //モーダルを非表示にします
        (<HTMLInputElement>document.getElementById('overlay')).style.display = 'none';
        (<HTMLInputElement>document.getElementById('modal')).style.display = 'none';
       fromAddbutton.disabled = false;
       taskcheck.disabled = false;
     }
  }
}