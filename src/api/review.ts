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
  myGrade: string | null;
  myMajor: number | null;
}

export interface ReviewCreateQuery {
  courseId: string;
  email: string;
  createTime: string;
  lastUpdateTime: string;
  overallRecommendation: string;
  quality: string;
  difficulty: string;
  workload: string;
  commentText: string;
}

export interface ReviewReadQuery {
  courseId?: string;
  email?: string;
  reviewId?: string;
  userId?: string;
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
    return this.getReviews({ courseId: courseId.toString() });
  }

  // post to `${apiPrefix}/api/review`
  public static async getReviewsByUserId(
    userId: number
  ): Promise<ReviewModel[]> {
    return this.getReviews({ userId: userId.toString() });
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
    const body = {
      _action: "create",
      courseId: query.courseId.toString(),
      email: query.email.toString(),
      createTime: Date.parse(query.createTime.toString()).toString(),
      lastUpdateTime: Date.parse(query.lastUpdateTime.toString()).toString(),
      overallRecommendation: query.overallRecommendation.toString(),
      quality: query.quality.toString(),
      difficulty: query.difficulty.toString(),
      workload: query.workload.toString(),
      commentText: query.commentText.toString(),
    };
    const responseBody = await fetch(`${apiPrefix}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = (await responseBody.json()) as ApiResponse<string>;
    return response;
  }
}
