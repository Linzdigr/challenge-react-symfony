<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use AppBundle\Entity\AbstractGenericEntity;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="operations")
     * @ORM\HasLifecycleCallbacks
     */
    class Operation extends AbstractGenericEntity{
        /* As columnDefinition="ENUM(type_operation) not working with pg */
        const DEBIT_CODE = 0;
        const CREDIT_CODE = 1;

        /**
         * @ORM\Column(type="integer")
         */
        protected $type;

        /**
         * @ORM\Column(type="string")
         */
        protected $label;

        /**
         * @ORM\Column(type="float")
         */
        protected $montant;

        /**
         * @ORM\Column(type="string")
         */
        protected $comment;

        /**
         * @ORM\ManyToOne(targetEntity="AccountSheet", inversedBy="operations")
         * @ORM\JoinColumn(nullable=false)
         * @var AccountSheet
         */
        protected $accountSheet;

        /**
         * @ORM\ManyToOne(targetEntity="Category")
         * @ORM\JoinColumn(nullable=false)
         * @var Category
         */
        protected $category;

        public function __construct($type = null, $label = null, $montant = null, $comment = null){
            $this->label = $label;
            $this->type = $type;
            $this->comment = $comment;
            $this->montant = $montant;
        }

        public function getAccountSheet(){
            return $this->accountSheet;
        }

        public function getType(){
            return $this->type;
        }

        public function getMontant(){
            return $this->montant;
        }

        public function setAccountSheet(AccountSheet $aSheet){
            $this->accountSheet = $aSheet;

            return $this;
        }

        public function setCategory(Category $cat){
            $this->category = $cat;

            return $this;
        }

        public function __destruct(){}
    }
