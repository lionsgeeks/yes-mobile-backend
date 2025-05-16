<?php

namespace App\Mail;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PdfReportMail extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $fileName;
    public $role;
    public $company;
    public $country;
    public $sponsors;
    /**
     * Create a new message instance.
     */
    public function __construct($name, $fileName , $role , $company  , $country ,$sponsors )
    {
        //
        $this->name = $name;
        $this->fileName = $fileName;
        $this->role = $role;
        $this->company = $company;
        $this->country = $country;
        $this->sponsors = $sponsors;
    }

    public function build()
    {
        $pdf = Pdf::loadView('maizzlMails.pdfcontent', ['name' => $this->name , 'fileName' => $this->fileName , 'role' => $this->role , 'company' => $this->company  , 'country' => $this->country , 'sponsors' => $this->sponsors]);

        return $this->subject('Your Badge')
            ->view('maizzlMails.pdfemail', ['name' => $this->name])
            ->attachData($pdf->output(), 'Badge.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
