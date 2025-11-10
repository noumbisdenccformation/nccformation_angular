import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './crypto.html',
  styleUrls: ['./crypto.css']
})
export class Crypto {} 