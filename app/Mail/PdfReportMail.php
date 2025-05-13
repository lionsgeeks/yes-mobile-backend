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
    /**
     * Create a new message instance.
     */
    public function __construct($name)
    {
        //
             $this->name = $name;
    }

    public function build()
    {
        $pdf = Pdf::loadView('pdf.invoice', ['name' => $this->name]);

       return $this->subject('Your PDF Report')
            ->view('emails.basic', ['name' => $this->name])
            ->attachData($pdf->output(), 'report.pdf', [
                'mime' => 'application/pdf',
            ]);

    }
}
