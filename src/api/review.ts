import { ApiResponse, apiPrefix, submitForm, setReqAction } from "./common";

export interface ReviewModel {
  reviewId: number;
  courseId: number;
  userId: number;
  createTime: string;
  lastUpdateTime: string;
  overallRecommendation: number;
  quality: number;
  difficulty: number;
  workload: number;
  commentText: string;
  myGrade?: string;
  myMajor?: number;
}

export interface ReviewCreateQuery {
  courseId: number;
  email: string;
  createTime: number;
  lastUpdateTime: number;
  overallRecommendation: number;
  quality: number;
  difficulty: number;
  workload: number;
  commentText: string;
  myGrade?: string;
  myMajor?: number;
}

export interface ReviewReadQuery {
  courseId?: number;
  email?: string;
  reviewId?: number;
  userId?: number;
}

export class ReviewApi {
  // post to `${apiPrefix}/api/review`.
  public static async getReviews(
    readQuery: ReviewReadQuery
  ): Promise<ReviewModel[]> {
    const responseBody = await submitForm({
      url: `${apiPrefix}/api/review`,
      body: setReqAction(readQuery, "read"),
    });
    const response = (await responseBody.json()) as ApiResponse<ReviewModel[]>;
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  }
  // post to `${apiPrefix}/api/review`.
  public static async getReviewsByCourseId(
    courseId: number
  ): Promise<ReviewModel[]> {
    return this.getReviews({ courseId: courseId });
  }

  // post to `${apiPrefix}/api/review`
  public static async getReviewsByUserId(
    userId: number
  ): Promise<ReviewModel[]> {
    return this.getReviews({ userId: userId });
  }

  public static async getReviewsByUserEmail(
    email: string
  ): Promise<ReviewModel[]> {
    return this.getReviews({ email: email });
  }

  // post to `${apiPrefix}/api/review` to create new reivew.
  public static async createReview(
    query: ReviewCreateQuery
  ): Promise<ApiResponse<string>> {
    const responseBody = await submitForm({
      url: `${apiPrefix}/api/review`,
      body: setReqAction(query, "create"),
    });
    const response = (await responseBody.json()) as ApiResponse<string>;
    return response;
  }

  public static getFormattedTime(review: ReviewModel) {
    if (review === null) return "";
    let c = review.createTime;
    let date = "";
    date =
      c[0] + "/" + c[1] + "/" + c[2] + " " + c[3] + ":" + c[4] + ":" + c[5];
    return date;
  }
}
