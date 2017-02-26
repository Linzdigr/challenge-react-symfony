<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;

    /**
     * @ORM\HasLifecycleCallbacks
     */
    abstract class GenericEntity{

        /**
         * @ORM\Column(type="datetime")
         */
        protected $created_at;

        /**
         * @ORM\Column(type="datetime")
         */
        protected $updated_at;

        public function __construct(){

        }

        /**
         * @ORM\PrePersist
         */
        public function preInsert(){
            $this->created_at = $this->updated_at = new \DateTime('now');
        }

        /** @ORM\PreUpdate */
        public function preUpdate(){
            $this->updated_at = new \DateTime('now');
        }

        public function destruct(){

        }
    }
