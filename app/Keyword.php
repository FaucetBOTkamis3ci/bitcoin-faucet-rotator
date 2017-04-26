<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Keyword
 * @package App
 */
class Keyword extends Model
{

    use Sluggable;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'keywords';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'keyword',
        'slug',
    ];

    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Get linked faucets.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function faucets(){
        return $this->hasMany(Faucet::class, 'faucets_keywords');
    }

    /**
     * Get linked payment processors.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function paymentProcessors(){
        return $this->hasMany(PaymentProcessor::class, 'keywords_payment_processors');
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        // TODO: Implement sluggable() method.
    }
}
