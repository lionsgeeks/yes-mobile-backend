<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $email;
    public $password;
    public $appStoreLink;
    public $playStoreLink;

    /**
     * Create a new message instance.
     */
    public function __construct($name, $email, $password , $appStoreLink , $playStoreLink)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->appStoreLink = $appStoreLink;
        $this->playStoreLink = $playStoreLink;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Welcome to YES Africa!')
                    ->view('maizzlMails.invitation')
                    ->with([
                        'name' => $this->name,
                        'email' => $this->email,
                        'password' => $this->password,
                        'appStoreLink' => $this->appStoreLink,
                        'playStoreLink' => $this->playStoreLink,
                    ]);
    }
}
