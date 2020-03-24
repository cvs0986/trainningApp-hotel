import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ApiServicesService } from "../../../../../api-services.service";
import { NzMessageService } from 'ng-zorro-antd';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Base64UploaderPlugin from '../../../@ckeditor/Base64Upload';
import * as $ from 'jquery';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {
  isAddPageVisible = false;
  isVisibleViewPageModal = false;
  isVisibleEditPageModal = false;
  isVisibleEditChapterModal = false;

  loading = false;
  loadingPages = false;

  public Editor = ClassicEditor;

  IFRAME_SRC = '//cdn.iframe.ly/api/iframe';
  API_KEY = 'd14ef1c078be5fd9c3222b';

  editorConfig = {
    extraPlugins: [Base64UploaderPlugin],
    removePlugins: ['mediaEmbed'],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo'
      ]
    },
    // plugins: [EasyImage],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h5',
          title: 'Heading 4',
          class: 'ck-heading_heading5'
        }
      ]
    },
    mediaEmbed: {
      previewsInData: true,
      providers: [
        {
          // hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
          name: 'iframely previews',

          // Match all URLs or just the ones you need:
          url: /.+/,

          html: match => {
            const url = match[0];

            const iframeUrl =
              this.IFRAME_SRC +
              '?app=1&api_key=' +
              this.API_KEY +
              '&url=' +
              encodeURIComponent(url);
            // alternatively, use &key= instead of &api_key with the MD5 hash of your api_key
            // more about it: https://iframely.com/docs/allow-origins

            return (
              // If you need, set maxwidth and other styles for 'iframely-embed' class - it's yours to customize
              '<div class="iframely-embed">' +
              '<div class="iframely-responsive">' +
              `<iframe src="${iframeUrl}"` +
              'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
              '</iframe>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ],
      resizeUnit: '%'
    }
  };

  chapterID;
  pages: any[];
  chapter: any[];

  pageTitle = '';
  pageDescription = '';

  chapterEditTitle = '';
  chapterEditDescription = '';
  chapterId;

  pageViewTitle;
  pageViewDescription;
  pageId;

  constructor(
    private route: ActivatedRoute,
    // private api: ApiServicesService,
    public msg: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = false;
    this.loadingPages = false;

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('chapterId')) {
        return;
      }
      this.chapterID = paramMap.get('chapterId');
      console.log(this.chapterID);
    });

    // this.api.getChapter(this.chapterID).subscribe(
    //   resp => {
    //     console.log(resp);
    //     this.chapter = resp.body.result.data;
    //     this.loading = false;
    //   },
    //   error => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // );

    // this.api.getPages(this.chapterID).subscribe(
    //   resp => {
    //     console.log(resp);
    //     this.pages = resp.body.result;
    //     this.loadingPages = false;
    //   },
    //   error => {
    //     console.log(error);
    //     this.loadingPages = false;
    //   }
    // );

    console.log(this.editorConfig.mediaEmbed);
  }

  onReadyCkEditor(editor) {
    console.log(editor);
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  showAddPageModal(): void {
    this.isAddPageVisible = true;
  }

  editPageModal(page): void {
    this.pageViewTitle = page.page_title;
    this.pageViewDescription = page.page_description;
    this.pageId = page.page_id;
    this.isVisibleEditPageModal = true;
  }

  showViewPageModal(page) {
    this.isVisibleViewPageModal = true;
    this.pageViewTitle = page.page_title;
    this.pageViewDescription = page.page_description;
  }

  showEditChapterModal(chapter) {
    this.isVisibleEditChapterModal = true;
    this.chapterEditTitle = chapter[0].chapter_title;
    this.chapterEditDescription = chapter[0].chapter_description;
    this.chapterId = chapter[0].id;
  }

  handleOk(): void {
    const data = {
      title: this.pageTitle,
      description: this.pageDescription,
      chapter_id: this.chapterID
    };
    console.log(data);
    // this.api.addPage(data).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if (resp.status === 201) {
    //       this.msg.create("success", "Page added successfully!");
    //       this.api.getPages(this.chapterID).subscribe(
    //         response => {
    //           console.log(response);
    //           this.pages = response.body.result;
    //           this.isAddPageVisible = false;
    //           this.pageTitle = "";
    //           this.pageDescription = "";
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     } else {
    //       this.msg.create("error", "Something went wrong!");
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     this.isAddPageVisible = false;
    //   }
    // );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.pageTitle = '';
    this.pageDescription = '';
    this.isAddPageVisible = false;
  }

  handleCancelViewPageModal(): void {
    console.log('Button cancel clicked!');
    this.isVisibleViewPageModal = false;
  }

  handleCancelEditPageModal(): void {
    console.log('Button cancel clicked!');
    this.isVisibleEditPageModal = false;
  }

  deleteChapter(e) {
    console.log(e);
    // this.api.deleteChapter(e[0].id).subscribe(
    //   resp => {
    //     if (resp.status === 202) {
    //       this.router.navigate(["/", "admin", "course", e[0].course_id]);
    //       this.msg.create("success", "Chapter deleted successfully!");
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  deletePage(page) {
    console.log(page);
    // this.api.deletePage(page.page_id).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if (resp.status === 202) {
    //       this.api.getPages(this.chapterID).subscribe(
    //         response => {
    //           console.log(response);
    //           this.pages = response.body.result;
    //           this.msg.create("success", "Page deleted successfully!");
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  deletePageCancel(): void {}

  deleteCancel(): void {}

  handleEditChapter() {
    const data = {
      title: this.pageViewTitle,
      description: this.pageViewDescription,
      page_id: this.pageId
    };
    console.log(data);
    // this.api.updatePage(data).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if (resp.status === 200) {
    //       this.msg.create("success", "Page updated successfully!");
    //       this.api.getPages(this.chapterID).subscribe(
    //         response => {
    //           console.log(response);
    //           this.pages = response.body.result;
    //           this.isVisibleEditPageModal = false;
    //         },
    //         error => {
    //           console.log(error);
    //           this.msg.create("error", "Something went wrong!");
    //         }
    //       );
    //     } else {
    //       this.msg.create("error", "Something went wrong!");
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     this.isVisibleEditPageModal = false;
    //     this.msg.create("error", "Something went wrong!");
    //   }
    // );
  }

  handleCancelEditChapterModal(): void {
    console.log('Button cancel clicked!');
    this.isVisibleEditChapterModal = false;
  }

  handleEditRealChapter() {
    const data = {
      title: this.chapterEditTitle,
      description: this.chapterEditDescription,
      chapter_id: this.chapterID
    };
    console.log(data);
    // this.api.updateChapter(data).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if (resp.status === 200) {
    //       this.api.getChapter(this.chapterID).subscribe(
    //         response => {
    //           console.log(response);
    //           this.chapter = response.body.result.data;
    //           this.isVisibleEditChapterModal = false;
    //           this.msg.create("success", "Chapter updated successfully!");
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //     this.isVisibleEditChapterModal = false;
    //   }
    // );
  }

  closeViewModal(): void {
    this.isVisibleViewPageModal = false;
  }
}
