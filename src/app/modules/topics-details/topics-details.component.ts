import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ApiServicesService } from "../../../../api-services.service";
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-topics-details',
  templateUrl: './topics-details.component.html',
  styleUrls: ['./topics-details.component.scss']
})
export class TopicsDetailsComponent implements OnInit {
  loading = false;

  isQuestionShow = false;
  hotelId;
  courseID;
  courseDetails;
  chapters: any[];
  quizzess: any;
  courseQuizQuestions: any[];

  chapterTitle = '';
  chapterDescription = '';

  courseTitle;
  courseDescription;
  courseDuration: number;

  isVisibleAddChapter = false;
  isVisibleCourseModal = false;
  visibleDrawer = false;

  questionTypes: any[];
  selectedQuestionType;

  quizTitle;
  question;
  option1;
  option1Answer = '0';
  option2;
  option2Answer = '0';
  option3;
  option3Answer = '0';
  option4;
  option4Answer = '0';

  singleChoiceAnswer;
  trueFalseAnswer;
  isQuizAvailable;

  coverImg: string;
  coverImgFile: File;
  storedCoverImg: string;

  constructor(
    private route: ActivatedRoute,
    // private api: ApiServicesService,
    private messageService: NzMessageService,
    private router: Router,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('courseId')) {
        return;
      }
      this.courseID = paramMap.get('courseId');
      console.log(this.courseID);
      // this.api.getCourse(this.courseID).subscribe(
      //   resp => {
      //     console.log(resp);
      //     this.courseDetails = resp.body.result;
      //     this.chapters = resp.body.result.chapters;
      //     this.courseTitle = resp.body.result.title;
      //     this.courseDuration = resp.body.result.course_duration;
      //     this.courseDescription = resp.body.result.description;
      //     this.coverImg =
      //       "https://trainingapp-img.s3.ap-south-1.amazonaws.com/" +
      //       resp.body.result.cover_img;
      //     this.storedCoverImg =
      //       "https://trainingapp-img.s3.ap-south-1.amazonaws.com/" +
      //       resp.body.result.cover_img;
      //     this.hotelId = resp.body.result.hotel_id;
      //     this.quizzess = resp.body.result.quiz;
      //     this.courseQuizQuestions = resp.body.quiz.course_quiz_quetion;
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    });

    this.questionTypes = [
      { name: 'Multi Choice', value: 'multi_choice' },
      { name: 'Single Choice', value: 'single_choice' },
      { name: 'True/False', value: 'yes_or_no' },
      { name: 'Subjective', value: 'open_ended' }
    ];
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line: no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  savedStoriesAvatarChange(info: { file: UploadFile }): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.getBase64(info.file!.originFileObj!, (img: string) => {
      this.coverImg = img;
      // tslint:disable-next-line: no-non-null-assertion
      this.coverImgFile = info.file!.originFileObj!;
      const formData = new FormData();
      formData.append('cover_img', this.coverImgFile);
      console.log(this.coverImgFile, formData.get('cover_img'));
      // this.api.updateTopicCoverImg(formData, this.courseID).subscribe(
      //   resp => {
      //     console.log(resp);
      //     if (resp.status === 201) {
      //       this.messageService.create(
      //         'success',
      //         'Image updated successfully!'
      //       );
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //     if (error.status === 401) {
      //       this.coverImg = this.storedCoverImg;
      //       this.messageService.create(
      //         'error',
      //         'Something went wrong! Please try after sometime.'
      //       );
      //     }
      //   }
      // );
    });
  }

  onChapterEdit() {}

  showModal(): void {
    this.isVisibleAddChapter = true;
  }

  showEditCourseModal() {
    this.isVisibleCourseModal = true;
  }

  handleOk(): void {
    const chapterData = {
      title: this.chapterTitle,
      description: this.chapterDescription,
      course_id: this.courseID
    };
    // this.api.addChapter(chapterData).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if (resp.status === 201) {
    //       this.api.getCourse(this.courseID).subscribe(
    //         response => {
    //           console.log(response);
    //           this.courseDetails = response.body.result;
    //           this.chapters = response.body.result.chapters;
    //           this.courseTitle = response.body.result.title;
    //           this.courseDuration = response.body.result.course_duration;
    //           this.courseDescription = response.body.result.description;
    //           this.isVisibleAddChapter = false;
    //           this.messageService.create(
    //             "success",
    //             "Chapter added successfully!"
    //           );
    //         },
    //         error => {
    //           console.log(error);
    //           this.messageService.create("error", "Something went wrong!");
    //         }
    //       );
    //     } else {
    //       this.isVisibleAddChapter = false;
    //       this.messageService.create("error", "Something went wrong!");
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     this.isVisibleAddChapter = false;
    //     this.messageService.create("error", "Something went wrong!");
    //   }
    // );
    console.log(chapterData);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleAddChapter = false;
  }

  handleCancelCourseEditModal(): void {
    console.log('Button cancel clicked!');
    this.isVisibleCourseModal = false;
  }

  deleteCourse(hotelId) {
    // this.api.deleteCourse(this.courseID).subscribe(
    //   resp => {
    //     console.log(resp);
    //     this.messageService.create("success", "Course deleted successfully!");
    //     this.router.navigateByUrl("/admin/hotels/" + hotelId);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  deleteCancel(): void {}

  handleEditCourse() {
    const data = {
      title: this.courseTitle,
      description: this.courseDescription,
      course_duration: +this.courseDuration,
      course_id: this.courseID
    };
    console.log(data);
    // this.api.updateCourse(data).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if (resp.body.message === "Course has been updated successfully.") {
    //       this.api.getCourse(this.courseID).subscribe(
    //         response => {
    //           this.courseDetails = response.body.result;
    //           this.isVisibleCourseModal = false;
    //           this.messageService.create(
    //             "success",
    //             "Course updated successfully!"
    //           );
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     this.isVisibleCourseModal = false;
    //   }
    // );
  }

  showAddQuizDrawer() {
    this.visibleDrawer = true;
  }

  closeQuizDrawer() {
    this.visibleDrawer = false;
  }

  showQuestion() {
    this.isQuestionShow = true;
  }

  hideQuestion() {
    this.isQuestionShow = false;
    this.quizTitle = '';
    this.question = '';
    this.option1 = '';
    this.option1Answer = '0';
    this.option2 = '';
    this.option2Answer = '0';
    this.option3 = '';
    this.option3Answer = '0';
    this.option4 = '';
    this.option4Answer = '0';
    this.selectedQuestionType = '';
  }

  checkSingleType() {
    if (this.selectedQuestionType === 'single_choice') {
      if (this.singleChoiceAnswer === '1') {
        return [
          {
            option: this.option1,
            is_true: 1
          },
          {
            option: this.option2,
            is_true: 0
          },
          {
            option: this.option3,
            is_true: 0
          },
          {
            option: this.option4,
            is_true: 0
          }
        ];
      }

      if (this.singleChoiceAnswer === '2') {
        return [
          {
            option: this.option1,
            is_true: 0
          },
          {
            option: this.option2,
            is_true: 1
          },
          {
            option: this.option3,
            is_true: 0
          },
          {
            option: this.option4,
            is_true: 0
          }
        ];
      }

      if (this.singleChoiceAnswer === '3') {
        return [
          {
            option: this.option1,
            is_true: 0
          },
          {
            option: this.option2,
            is_true: 0
          },
          {
            option: this.option3,
            is_true: 1
          },
          {
            option: this.option4,
            is_true: 0
          }
        ];
      }

      if (this.singleChoiceAnswer === '4') {
        return [
          {
            option: this.option1,
            is_true: 0
          },
          {
            option: this.option2,
            is_true: 0
          },
          {
            option: this.option3,
            is_true: 0
          },
          {
            option: this.option4,
            is_true: 1
          }
        ];
      }
    }

    if (this.selectedQuestionType === 'multi_choice') {
      return [
        {
          option: this.option1,
          is_true: this.option1Answer
        },
        {
          option: this.option2,
          is_true: this.option2Answer
        },
        {
          option: this.option3,
          is_true: this.option3Answer
        },
        {
          option: this.option4,
          is_true: this.option4Answer
        }
      ];
    }

    if (this.selectedQuestionType === 'yes_or_no') {
      if (this.trueFalseAnswer === '0') {
        return [
          {
            option: 'Yes',
            is_true: 1
          },
          {
            option: 'No',
            is_true: 0
          }
        ];
      }
      if (this.trueFalseAnswer === '1') {
        return [
          {
            option: 'Yes',
            is_true: 0
          },
          {
            option: 'No',
            is_true: 1
          }
        ];
      }
    }
  }

  onAddQuiz(hotelId) {
    if (this.quizzess === null) {
      const quiz = {
        title: this.quizTitle,
        questions: [
          {
            question_type: this.selectedQuestionType,
            title: this.question,
            options: this.checkSingleType()
          }
        ]
      };
      const data = {
        quiz: JSON.stringify(quiz)
      };
      console.log(data, hotelId);
      // this.api.addQuiz(this.courseID, JSON.stringify(data)).subscribe(
      //   resp => {
      //     console.log(resp);
      //     if (resp.status === 201) {
      //       this.api.getCourse(this.courseID).subscribe(
      //         response => {
      //           this.hotelId = response.body.result.hotel_id;
      //           this.quizzess = response.body.result.quiz;
      //           this.courseQuizQuestions =
      //             response.body.quiz.course_quiz_quetion;
      //           this.messageService.create(
      //             "success",
      //             "Quiz added successfully!"
      //           );
      //         },
      //         error => {
      //           console.log(error);
      //         }
      //       );
      //       this.hideQuestion();
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    }

    if (this.quizzess !== null) {
      const quiz = {
        question_type: this.selectedQuestionType,
        question_title: this.question,
        options: JSON.stringify(this.checkSingleType())
      };
      const data = {
        quiz: JSON.stringify(quiz)
      };
      console.log(data, hotelId);
      // this.api.addQuizQuestion(this.quizzess.id, quiz).subscribe(
      //   resp => {
      //     console.log(resp);
      //     if (resp.status === 201) {
      //       this.api.getCourse(this.courseID).subscribe(
      //         response => {
      //           this.hotelId = response.body.result.hotel_id;
      //           this.quizzess = response.body.result.quiz;
      //           this.courseQuizQuestions =
      //             response.body.quiz.course_quiz_quetion;
      //         },
      //         error => {
      //           console.log(error);
      //         }
      //       );
      //       this.hideQuestion();
      //       this.notificationService.create(
      //         "success",
      //         "Added",
      //         "Question added successfully!"
      //       );
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
      console.log(JSON.stringify(quiz), hotelId);
    }
  }

  deleteQuizQuest(quizQuestion) {
    console.log(quizQuestion);
    // this.api.deleteQuizQuest(quizQuestion.id).subscribe(
    //   resp => {
    //     if (resp.status === 202) {
    //       this.notificationService.create(
    //         "info",
    //         "Deleted",
    //         "Question deleted successfully!"
    //       );
    //       this.api.getCourse(this.courseID).subscribe(
    //         response => {
    //           this.hotelId = response.body.result.hotel_id;
    //           this.quizzess = response.body.result.quiz;
    //           this.courseQuizQuestions = response.body.quiz.course_quiz_quetion;
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //     console.log(resp);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  deleteQuizQuestCancel(): void {}
}
