import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ComGoUtils } from '@ComGo/utils';
import { ComGoConfigService } from '@ComGo/services/config.service';
// import { FaqService } from 'app/main/pages/faq/faq.service';

@Component({
    selector   : 'faq',
    templateUrl: './faq.component.html',
    styleUrls  : ['./faq.component.scss']
})
export class FAQComponent
{
    faqs: any;
    faqsFiltered: any;
    step: number;
    searchInput: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FaqService} _faqService
     */
    constructor(
        private _ComGoConfigService: ComGoConfigService,
        // private _faqService: FaqService
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');
        this.step = 0;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._ComGoConfigService.config = {
            layout: {
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this._faqService.onFaqsChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(response => {
        //         this.faqs = response;
        //         this.faqsFiltered = response;
        //     });
      this.faqsFiltered =[
        {question:"Organization Registration",img:"../../../../assets/images/ComGo2.0gif/orgRegistration.gif"},
        {question:"Private User Registration",img:"../../../../assets/images/ComGo2.0gif/privateUserReg.gif"},
        {question:"Generating Paypal Token",img:"../../../../assets/images/ComGo2.0gif/generatePaypalToken.gif"},
        {question:"Fill Organization Profile",img:"../../../../assets/images/ComGo2.0gif/orgProfileAfterReg.gif"},
        {question:"Add Project",img:"../../../../assets/images/ComGo2.0gif/addProjectMOrg.gif"},
        {question:"Edit Project",img:"../../../../assets/images/ComGo2.0gif/editProjectMOrg.gif"},
        {question:"Add Milestone",img:"../../../../assets/images/ComGo2.0gif/createMilestone.gif"},
        {question:"Edit Milestone",img:"../../../../assets/images/ComGo2.0gif/editMilestone.gif"},
        {question:"Add Activity",img:"../../../../assets/images/ComGo2.0gif/addActivity.gif"},
        {question:"Edit Activity",img:"../../../../assets/images/ComGo2.0gif/editActivity.gif"},
        {question:"Send For Approval",img:"../../../../assets/images/ComGo2.0gif/sendForApproval.gif"},
        {question:"Approve/Reject Activity",img:"../../../../assets/images/ComGo2.0gif/approveActivity.gif"},
        {question:"Approve Project",img:"../../../../assets/images/ComGo2.0gif/approveProject.gif"},
        { question: "Change Project Visibility", img:"../../../../assets/images/ComGo2.0gif/changeProjectVisibility.gif" },
        { question: "Publish Project", img:"../../../../assets/images/ComGo2.0gif/publishProject.gif" },
            { question: "Self Donation", img:"../../../../assets/images/ComGo2.0gif/selfDonate.gif" },
        {question:"Donation",img:"../../../../assets/images/ComGo2.0gif/donation.gif"},
        {question:"Manual Allocation of Funds",img:"../../../../assets/images/ComGo2.0gif/manualFundAllocation.gif"},
        {question:"Add Expense",img:"../../../../assets/images/ComGo2.0gif/addExpense.gif"},
        // {question:"What to do after adding expenses ?",answer:"When expenses are created or updated its status becomes not approved,Foundation needs to approve the expenses.",img:"../../../../assets/images/ComGoSnapShots/approveExpense.gif"},
        // {question:"What to do after approving expenses ?",answer:"When all the expenses are approved Foundation gets the request fund button for requesting funds from Foundation.",img:"../../../../assets/images/ComGoSnapShots/requestFund.gif"},
        {question:"Edit Expense",img:"../../../../assets/images/ComGo2.0gif/editExpense.gif"},
        {question:"Request Fund",img:"../../../../assets/images/ComGo2.0gif/fundRequested.gif"},
        {question:"Release Fund",img:"../../../../assets/images/ComGo2.0gif/releaseFund.gif"},
        {question:"Add Proof",img:"../../../../assets/images/ComGo2.0gif/addProof.gif"},
        {question:"Add External Validator while adding proof",img:"../../../../assets/images/ComGo2.0gif/addProof2.gif"},
        {question:"Validate Activity",img:"../../../../assets/images/ComGo2.0gif/validateActivity.gif"},
        {question:"Close Activity",img:"../../../../assets/images/ComGo2.0gif/closeActivity.gif"},
        {question:"CRM Notification",img:"../../../../assets/images/ComGo2.0gif/crmNotifications.gif"}
      ]
        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this.faqsFiltered = ComGoUtils.filterArrayByString(this.faqs, searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set step
     *
     * @param {number} index
     */
    setStep(index: number): void
    {
        this.step = index;
    }

    /**
     * Next step
     */
    nextStep(): void
    {
        this.step++;
    }

    /**
     * Previous step
     */
    prevStep(): void
    {
        this.step--;
    }
}
