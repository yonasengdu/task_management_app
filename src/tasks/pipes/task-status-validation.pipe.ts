import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any): any {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value} is not valid status valid status are: | ${TaskStatus.DONE} |, | ${TaskStatus.IN_PROGRESS} | and | ${TaskStatus.OPEN} |`,
      );
    } else {
      return value;
    }
  }
  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
