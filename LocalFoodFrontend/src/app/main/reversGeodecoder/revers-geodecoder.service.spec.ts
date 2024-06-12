import { TestBed } from '@angular/core/testing';

import { ReversGeodecoderService } from './revers-geodecoder.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ReversGeodecoderService', () => {
  let service: ReversGeodecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ReversGeodecoderService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
