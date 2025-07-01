export class DateUtils {
  static getStartOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
