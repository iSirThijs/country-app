import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  @Input() labelName: string = ''
  @Input() labelType: string = ''

  ngOnInit(): void {
  }

}
